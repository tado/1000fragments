uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.85 + 0.49 * sin(t * 1.11)) + vec2(-0.46, -0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.82 - t * 2.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	p.x += sin(p.y * 5.51 + time * 1.26) * 0.33;
	p = (floor(p * 7.5) + 0.5) / 7.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.71 + time * 0.11, vec3(0.53, 0.49, 0.42), vec3(0.44, 0.35, 0.44), vec3(1.14, 0.95, 0.92), vec3(0.65, 0.17, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
