uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.55;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.57; kp = rot2(1.94) * kp; kp *= 1.44; }
    v = sin(kp.x * 2.67 - t * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	float d = 0.5 + 0.5 * field(p, (time * 0.84), 0.0);
	vec2 hq = rot2(1.22) * p * 19.49;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.12, 0.01, 0.02), vec3(0.97, 0.79, 0.64), v);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.84)) * 100.0) - 0.5) * 0.06;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.921, 0.998, 1.031) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
