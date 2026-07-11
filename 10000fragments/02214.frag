uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.35 + sr * 20.66 - t * 3.77 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.07, vec3(0.57, 0.48, 0.52), vec3(0.44, 0.42, 0.48), vec3(1.22, 0.72, 0.73), vec3(0.85, 0.85, 0.48));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
