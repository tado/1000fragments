uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.95 + sr * 22.53 - t * 3.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.89) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.28, vec3(0.41, 0.43, 0.59), vec3(0.32, 0.49, 0.42), vec3(0.87, 0.90, 1.27), vec3(0.65, 0.38, 0.72));
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
