uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.90 + t * 1.38) - 0.5) * 2.0;
    v = sin((p.y * 6.27 + zx * 1.39 + t * 1.59) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.78) * 0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.99 / 3.1415927, 0.72 / r + (time * 0.78) * 1.87);
	float d = field(tv, (time * 0.78), 0.0);
	vec3 col = palette((d) * 0.69 + (time * 0.78) * 0.24, vec3(0.49, 0.37, 0.39), vec3(0.14, 0.18, 0.10), vec3(0.83, 0.52, 0.70), vec3(0.92, 0.96, 0.66));
	col *= clamp(r * 2.16, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.78)) * 100.0) - 0.5) * 0.08;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 0.941, 1.022) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
