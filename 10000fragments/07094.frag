uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.36 + sr * 21.58 - t * 4.43 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.01, vec3(0.41, 0.51, 0.53), vec3(0.46, 0.40, 0.45), vec3(1.35, 1.17, 1.07), vec3(0.36, 0.98, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
