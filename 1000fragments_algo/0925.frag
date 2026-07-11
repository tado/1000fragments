uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.25; vec2 jc = vec2(-0.11 + 0.3 * sin(t * 1.42 + ph), -0.52 + 0.3 * cos(t * 0.40 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.42;
	p += vec2(sin((time * 0.79) * 0.46), cos((time * 0.79) * 1.00)) * 0.20;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.63 / 3.1415927, 0.79 / r - (time * 0.79) * 2.46);
	tv.x += tv.y * 0.47;
	float d = field(tv, (time * 0.79), 0.0);
	vec3 col = palette((d) * 0.52 + (time * 0.79) * 0.23, vec3(0.36, 0.36, 0.36), vec3(0.22, 0.21, 0.23), vec3(0.57, 0.84, 0.52), vec3(0.08, 0.45, 0.47));
	col *= clamp(r * 2.99, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.993, 0.927) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
