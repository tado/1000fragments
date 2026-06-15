uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.65 - t * 3.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	p = rot2(p.y * -1.40 + time * 0.52) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.19, vec3(0.42, 0.42, 0.58), vec3(0.39, 0.46, 0.30), vec3(0.78, 0.87, 0.75), vec3(0.58, 0.07, 0.44));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
