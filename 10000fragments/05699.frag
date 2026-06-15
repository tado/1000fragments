uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.78, t * 2.11 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	p += vec2(0.11, -0.59) * sin(length(p) * 5.47 - time * 0.57) * 0.18;
	p = rot2(length(p) * -1.01 + time * 0.72) * p;
	p = abs(p);
	p = fract(p * 1.54) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.27));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
