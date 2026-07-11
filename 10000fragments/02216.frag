uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.92 + sr * 18.55 - t * 4.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.20, vec3(0.49, 0.54, 0.51), vec3(0.32, 0.44, 0.44), vec3(0.97, 1.00, 1.39), vec3(0.58, 0.77, 0.12));
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
