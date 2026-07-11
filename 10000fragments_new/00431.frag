uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.46 + t * 0.52 + ph) * 0.7;
    float wb = sin(p.y * 11.08 - t * 1.31 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.46;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	p = rot2(length(p) * -1.83 + time * 1.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.01, vec3(0.56, 0.50, 0.56), vec3(0.48, 0.33, 0.42), vec3(0.95, 1.34, 1.25), vec3(0.08, 0.50, 0.72));
	col = fract(col * 1.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
