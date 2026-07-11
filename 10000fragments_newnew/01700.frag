uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.13 + t * 1.77 + ph) * 0.7;
    float wb = sin(p.y * 10.25 - t * 3.71 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.63;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 2.12 + time * 0.67) * p;
	p += vec2(0.74, 0.78) * sin(length(p) * 4.61 - time * 2.16) * 0.17;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.70;
	p = rot2(0.46) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.71, 0.53, 0.66) * (0.11 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
