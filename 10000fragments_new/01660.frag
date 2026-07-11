uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 19.24 - t * 7.42 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 21.32 - t * 2.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p = fract(p * 1.63) - 0.5;
	p = rot2(p.y * 3.87 + time * 0.74) * p;
	p = rot2(1.65) * p;
	p.y += sin(p.x * 2.34 + time * 1.56) * 0.39;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.06, 0.36), vec3(0.69, 0.89, 0.87), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.28 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
