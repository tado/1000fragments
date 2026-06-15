uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.60 + sr * 20.25 - t * 2.78 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.56) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.23, vec3(0.57, 0.44, 0.55), vec3(0.46, 0.32, 0.32), vec3(0.95, 1.12, 1.35), vec3(0.95, 0.83, 0.94));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
