uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.15 + sin(p.y * 2.53 + t * 4.36) * 4.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(1.54) * p; }
	p = rot2(length(p) * -1.70 + time * 1.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.06, 1.41, 0.55) + vec3(0.30, 0.12, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
