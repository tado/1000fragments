uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.20 + t * 1.02 + ph) * 0.7;
    float wb = sin(p.y * 18.72 - t * 1.32 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.48;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	p += vec2(-0.50, -0.50) * sin(length(p) * 2.32 - time * 2.20) * 0.34;
	{ float fr = length(p); p *= 1.0 + 0.49 * fr * fr; }
	p.x += sin(p.y * 3.48 + time * 1.45) * 0.21;
	p = rot2(time * 0.92) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.35, 0.62, 0.28) * (0.06 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
