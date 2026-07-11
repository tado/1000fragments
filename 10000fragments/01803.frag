uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.06 + sr * 23.45 - t * 2.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.06, vec3(0.42, 0.54, 0.52), vec3(0.35, 0.46, 0.39), vec3(1.31, 1.35, 0.71), vec3(0.64, 0.81, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
