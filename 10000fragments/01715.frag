uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.05 - t * 2.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	p = rot2(1.64) * p;
	p = rot2(time * -1.11) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.26, vec3(0.42, 0.50, 0.44), vec3(0.42, 0.38, 0.39), vec3(0.84, 1.33, 0.91), vec3(0.74, 0.91, 0.81));
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
