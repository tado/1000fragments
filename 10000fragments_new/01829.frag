uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 34.96 - t * 5.41 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 35.09 - t * 7.31 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	p.x += sin(p.y * 6.60 + time * 2.14) * 0.34;
	p = rot2(time * -1.42) * p;
	p = rot2(length(p) * -2.45 + time * 0.64) * p;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.16, 0.67, 0.89) + vec3(0.23, 0.08, 0.29);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.24 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
