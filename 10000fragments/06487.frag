uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.26 + t * 4.77 + ph) + sin(p.y * 4.25 - t * 4.77 + ph)
        + sin((p.x + p.y) * 3.39 + t * 4.77 + ph) + sin(length(p) * 6.10 - t * 4.77 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.54 + sr * 17.29 - t * 4.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	p += vec2(-0.77, -0.51) * sin(length(p) * 3.00 - time * 1.24) * 0.23;
	p *= 2.83;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.29);
	float d = d1 + d2;
	vec3 col = palette(d * 0.99 + time * 0.16, vec3(0.49, 0.42, 0.46), vec3(0.41, 0.41, 0.38), vec3(1.30, 1.33, 1.32), vec3(0.58, 0.94, 0.63));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
