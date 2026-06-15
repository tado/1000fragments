uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.01 + sr * 5.64 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.30, vec3(0.53, 0.54, 0.54), vec3(0.45, 0.32, 0.38), vec3(1.36, 0.91, 1.04), vec3(0.88, 0.87, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
