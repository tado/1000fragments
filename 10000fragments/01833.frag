uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.66 + t * 2.50 + ph) + sin(p.y * 15.07 - t * 3.67 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.67 + sr * 10.49 - t * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.54 + time * 0.14, vec3(0.57, 0.59, 0.51), vec3(0.36, 0.44, 0.36), vec3(1.34, 0.91, 1.10), vec3(0.23, 0.42, 0.68));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
