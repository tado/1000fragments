uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.61;
    v = 0.5 * (sin(4.0 * cp.x + t * 0.72) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.32) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.76) * -0.25;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.21 / 3.1415927, 0.45 / r - (time * 0.76) * 2.45);
	tv.x += tv.y * 0.17;
	float d = field(tv, (time * 0.76), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.53, 0.54, 0.42) + vec3(0.05, 0.06, 0.00);
	col *= clamp(r * 1.63, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.76)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.997, 0.998) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
