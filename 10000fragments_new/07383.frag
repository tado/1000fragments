uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.32);
    float gsh = hash21(vec2(grow, floor(t * 7.32))) - 0.5;
    float gx = p.x + gsh * 0.45;
    v = sin(gx * 7.61 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.32));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 9.48 - t * 1.32 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 38.39 - t * 6.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.32, length(p) * 4.09 - time * 0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.22 + time * 0.27, vec3(0.40, 0.47, 0.58), vec3(0.46, 0.37, 0.38), vec3(1.11, 1.32, 1.01), vec3(0.64, 0.38, 0.26));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
