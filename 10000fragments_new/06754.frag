uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.57 + t * 2.57 + ph) + sin(p.y * 13.44 - t * 2.57 + ph)
        + sin((p.x + p.y) * 5.61 + t * 2.57 + ph) + sin(length(p) * 12.69 - t * 2.57 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.05, vec3(0.57, 0.50, 0.43), vec3(0.43, 0.36, 0.42), vec3(1.04, 1.29, 1.15), vec3(1.00, 0.25, 0.68));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
