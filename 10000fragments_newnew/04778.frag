uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.85;
    v = 0.5 * (sin(6.0 * cp.x + t * 1.33) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.91) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -2.90 + time * 0.99) * p;
	p += vec2(-0.35, 0.85) * sin(length(p) * 2.04 - time * 2.39) * 0.12;
	p = fract(p * 2.30) - 0.5;
	p *= 1.0 + 0.39 * sin(time * 4.18);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.45, 0.47), vec3(0.84, 0.79, 0.98), d);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
