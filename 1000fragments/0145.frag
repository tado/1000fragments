uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.84 + sr * 14.32 - t * 3.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.19, vec3(0.44, 0.50, 0.57), vec3(0.39, 0.48, 0.32), vec3(0.78, 1.27, 0.74), vec3(0.56, 0.02, 0.80));
	col = fract(col * 1.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
