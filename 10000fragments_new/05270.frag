uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.05 + t * 2.01 + ph) * 0.7;
    float wb = sin(p.y * 16.71 - t * 2.90 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.68;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.09, 0.20), vec3(0.74, 0.61, 0.69), d);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
