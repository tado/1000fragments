uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.38 + t * 4.94 + ph) + sin(p.y * 14.56 - t * 5.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.03, vec3(0.42, 0.60, 0.54), vec3(0.44, 0.34, 0.42), vec3(1.15, 1.27, 1.27), vec3(0.04, 0.93, 0.14));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
