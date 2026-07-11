uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.92 + 0.43 * sin(t * 0.84)) + vec2(-0.39, -0.29) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.58) * 0.55), cos((time * 0.58) * 0.51)) * 0.11;
	float an = atan(p.y, p.x) + (time * 0.58) * -0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.99 / 3.1415927, 0.78 / r + (time * 0.58) * 1.01);
	float d = field(tv, (time * 0.58), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.58, 0.53, 0.49) + vec3(0.08, 0.06, 0.06);
	col *= clamp(r * 2.76, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.58)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.963, 1.020) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
