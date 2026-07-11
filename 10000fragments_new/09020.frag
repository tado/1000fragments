uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.90);
    float gsh = hash21(vec2(grow, floor(t * 9.48))) - 0.5;
    float gx = p.x + gsh * 1.01;
    v = sin(gx * 12.82 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.02));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.16, vec3(0.53, 0.45, 0.46), vec3(0.33, 0.39, 0.34), vec3(0.94, 0.99, 1.07), vec3(0.72, 0.80, 0.29));
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
