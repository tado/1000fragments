uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.08 + sr * 13.60 - t * 2.63 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.67) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.05, vec3(0.43, 0.52, 0.56), vec3(0.41, 0.36, 0.33), vec3(1.17, 1.00, 1.11), vec3(0.23, 0.67, 0.29));
	col = fract(col * 2.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
