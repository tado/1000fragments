uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.47 + sr * 19.55 - t * 3.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.11, vec3(0.48, 0.51, 0.59), vec3(0.34, 0.40, 0.47), vec3(1.08, 0.72, 1.00), vec3(0.26, 0.31, 0.24));
	col = fract(col * 1.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
