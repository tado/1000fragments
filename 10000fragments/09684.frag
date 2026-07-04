uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.04;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.41) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.75) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.49;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.05) * p * 12.33;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.14, 0.03, 0.13), vec3(0.84, 0.92, 0.91), v);
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
