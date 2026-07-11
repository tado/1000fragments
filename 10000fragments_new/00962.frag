uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.15 * cos(sa * 5.0 + t * 1.84 + ph);
    v = sin((sr - petal) * 19.61);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.00, vec3(0.51, 0.51, 0.50), vec3(0.35, 0.37, 0.34), vec3(0.96, 1.29, 0.97), vec3(0.43, 0.34, 0.20));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
