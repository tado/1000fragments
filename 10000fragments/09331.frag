uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.20 * cos(sa * 9 + t * 2.31 + ph);
    v = sin((sr - petal) * 14.33);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.09, vec3(0.57, 0.41, 0.51), vec3(0.42, 0.47, 0.30), vec3(1.33, 0.78, 1.02), vec3(0.01, 0.45, 0.92));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
