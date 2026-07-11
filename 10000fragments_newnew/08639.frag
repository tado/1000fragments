uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.57);
    float gsh = hash21(vec2(grow, floor(t * 9.71))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 15.16 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.17));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.03, vec3(0.54, 0.52, 0.41), vec3(0.37, 0.46, 0.49), vec3(1.04, 0.78, 1.21), vec3(0.03, 0.67, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
