uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.73 + t * 0.94 + ph) * 0.7;
    float wb = sin(p.y * 16.18 - t * 2.55 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.71;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = rot2(0.39) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(1.77) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.26, 0.58, 0.15) * (0.20 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
