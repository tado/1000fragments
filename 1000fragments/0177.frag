uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.81 + t * 2.10 + ph) + sin(p.y * 17.93 - t * 3.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	p = rot2(length(p) * 3.14 + time * 0.52) * p;
	p += vec2(0.62, -0.41) * sin(length(p) * 4.07 - time * 1.99) * 0.26;
	p *= 3.41;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.24));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
