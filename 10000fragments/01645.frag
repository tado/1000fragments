uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.17;
    v = 0.5 * (sin(4.0 * cp.x + t * 0.65) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 2.56) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.65) * p * 21.97;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.02, 0.12, 0.05), vec3(0.87, 0.99, 0.84), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
