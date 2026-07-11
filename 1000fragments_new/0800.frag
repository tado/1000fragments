uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.40 + t * 2.22 + ph) * 0.7;
    float wb = sin(p.y * 9.51 - t * 2.29 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.65;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.59;
	p = rot2(1.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.40, 0.45, 0.62) * (0.25 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
