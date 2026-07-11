uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.27 + 0.14 * sin(t * 1.56)) + vec2(-0.68, -0.24) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.03, vec3(0.45, 0.53, 0.56), vec3(0.45, 0.43, 0.37), vec3(1.34, 1.31, 0.97), vec3(0.74, 0.15, 0.68));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
