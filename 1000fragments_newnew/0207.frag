uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.61; vec2 jc = vec2(0.08 + 0.3 * sin(t * 0.73 + ph), 0.14 + 0.3 * cos(t * 1.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.52) * 0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.46 / 3.1415927, 0.72 / r - (time * 0.52) * 2.86);
	float d = field(tv, (time * 0.52), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.53, 0.47, 0.48) + vec3(0.07, 0.07, 0.09);
	col *= clamp(r * 2.12, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.52)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.056, 1.003, 0.949) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
