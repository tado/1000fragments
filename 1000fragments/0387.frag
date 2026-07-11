uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.25 + t * 2.16 + ph) + sin(p.y * 4.78 - t * 1.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.23;
	p = rot2(time * -0.70) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.47));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
