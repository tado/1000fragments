uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.84 + 0.44 * sin(t * 1.33)) + vec2(-0.88, -0.20) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.32;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.08 / 3.1415927, 1.27 / r - time * 1.27);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.40, vec3(0.53, 0.51, 0.55), vec3(0.50, 0.38, 0.48), vec3(0.83, 1.02, 0.70), vec3(0.14, 0.54, 0.11));
	col *= clamp(r * 1.42, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
