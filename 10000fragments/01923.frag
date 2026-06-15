uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.82 + sr * 18.41 - t * 3.46 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.47 - t * 1.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.12);
	float d = d1 + d2;
	vec3 col = palette(d * 1.21 + time * 0.07, vec3(0.57, 0.45, 0.52), vec3(0.41, 0.41, 0.38), vec3(1.27, 1.20, 1.34), vec3(0.93, 0.98, 0.81));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
