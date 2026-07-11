uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.52 + sr * 9.44 - t * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.39;
	p += vec2(-0.65, 0.91) * sin(length(p) * 5.04 - time * 1.52) * 0.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.26, vec3(0.47, 0.56, 0.53), vec3(0.38, 0.43, 0.46), vec3(1.34, 0.71, 1.10), vec3(0.82, 0.08, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
