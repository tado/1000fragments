uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.75 - t * 1.25;
    v = sin(floor(lv * 2.2) / 2.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 10.4) + 0.5) / 10.4;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.01, vec3(0.54, 0.43, 0.54), vec3(0.44, 0.42, 0.47), vec3(1.01, 0.93, 1.09), vec3(0.33, 0.38, 0.87));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
