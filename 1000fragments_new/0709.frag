uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.87 + 0.30 * sin(t * 0.48)) + vec2(-0.29, -0.09) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.59) * p * 11.87;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.83 + time * 0.26, vec3(0.53, 0.44, 0.43), vec3(0.33, 0.35, 0.49), vec3(0.83, 0.99, 1.06), vec3(0.64, 0.75, 0.56)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
