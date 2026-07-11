uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.11 + t * 2.98 + ph) * 0.7;
    float wb = sin(p.y * 18.40 - t * 0.92 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.80;
	p *= 2.28;
	p = rot2(1.86) * p;
	p = rot2(time * 0.67) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.77, 1.49, 1.45) + vec3(0.13, 0.21, 0.19);
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
