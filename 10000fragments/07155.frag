uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.19, t * 1.11 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.32) - 0.5;
	p = rot2(2.11) * p;
	p = rot2(time * -0.25) * p;
	p += vec2(0.61, -0.23) * sin(length(p) * 5.04 - time * 1.10) * 0.20;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.24, 0.25, 0.09), vec3(0.74, 1.00, 0.52), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
