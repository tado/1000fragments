uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.66 + t * 3.38 + ph) * 0.7;
    float wb = sin(p.y * 10.58 - t * 2.51 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.89) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.46; p = rot2(1.31) * p; }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.92; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.58, 0.76, 0.69) + vec3(0.11, 0.28, 0.05);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
