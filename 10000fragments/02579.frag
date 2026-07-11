uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.19 * cos(sa * 7 + t * 0.38 + ph);
    v = sin((sr - petal) * 10.33);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.23, vec3(0.57, 0.44, 0.53), vec3(0.31, 0.48, 0.42), vec3(1.13, 1.40, 0.94), vec3(0.11, 0.35, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
