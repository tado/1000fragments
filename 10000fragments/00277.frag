uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.54);
    float gsh = hash21(vec2(grow, floor(t * 2.51))) - 0.5;
    float gx = p.x + gsh * 1.13;
    v = sin(gx * 7.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.11));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.04, 1.36, 0.86) + vec3(0.10, 0.08, 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
